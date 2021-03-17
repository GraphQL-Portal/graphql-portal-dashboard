import { Db } from 'mongodb';
import { getArrayRepeats } from '../../common/tool';

const index: any = { endpoint: 1 };

export const up = async (db: Db): Promise<void> => {
  const apiDefsCollection = await db.collection('apidefs');
  const apiDefs: {
    endpoint: string;
  }[] = await apiDefsCollection.find().toArray();
  const repeats = getArrayRepeats(apiDefs.map((apiDef) => apiDef.endpoint));
  if (repeats.length) {
    throw new Error(
      `Cannot create index as apiDef.endpoint has repeats: ${repeats}`
    );
  }

  await apiDefsCollection.createIndex(index, {
    unique: true,
    sparse: true,
  });
};

export const down = async (db: Db): Promise<void> => {
  await db.collection('apidefs').dropIndex(index);
};
