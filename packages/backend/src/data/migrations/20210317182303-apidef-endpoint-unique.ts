import { Db } from 'mongodb';
import { getArrayDuplicates } from '../../common/tool';

const index: any = { endpoint: 1 };

export const up = async (db: Db): Promise<void> => {
  const apiDefsCollection = await db.collection('apidefs');
  const apiDefs: {
    _id: string;
    name: string;
    endpoint: string;
  }[] = await apiDefsCollection.find().toArray();
  const duplicates = getArrayDuplicates(apiDefs.map(apiDef => apiDef.endpoint));
  if (duplicates.length) {
    const apiDefsWithDuplicates = apiDefs.filter(apiDef =>
      duplicates.includes(apiDef.endpoint)
    );
    await Promise.all(
      apiDefsWithDuplicates.map(async (apiDef, i) => {
        const endpoint = `${apiDef.endpoint}_${i}`;
        console.log(`ApiDef '${apiDef.name}' endpoint changed to: ${endpoint}`);
        await apiDefsCollection.updateOne(
          { _id: apiDef._id },
          { $set: { endpoint } }
        );
      })
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
