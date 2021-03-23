import { Db } from 'mongodb';
import { encryptAny, decryptAny } from '../../common/tool/cipher.tool';

const tableFields: { [key: string]: string[] } = {
  sources: ['handler'],
  apidefs: ['authentication', 'allow_ips', 'deny_ips'],
};

const migrate = async (
  db: Db,
  cipherMethod: (data: any) => any
): Promise<void> => {
  const promises = [];
  for (const table of Object.keys(tableFields)) {
    for (const field of tableFields[table]) {
      promises.push(
        await db
          .collection(table)
          .find({ [field]: { $exists: true } })
          .map(function (row) {
            row[field] = cipherMethod(row[field]);
            return db
              .collection(table)
              .updateOne({ _id: row._id }, { $set: { [field]: row[field] } });
          })
          .toArray()
      );
    }
  }
  await Promise.all(promises.flat(3));
};

export const up = async (db: Db): Promise<void> => migrate(db, encryptAny);

export const down = async (db: Db): Promise<void> => migrate(db, decryptAny);
