import { text } from 'body-parser';
import { Project } from '../models/project';
import { ProjectSearchSchema } from '../validation/common.validation';
const searchProjectService = async (
  q: ProjectSearchSchema,
  { page = 1, perPage = 1 }: { page: any; perPage: any }
) => {
  let results;
  let count;
  let isNextable;
  console.log(q);
  if (Object.keys(q).length === 0) {
    results = await Project.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    count = await Project.find().count();
    isNextable = (page - 1) * perPage + results.length < count;
  } else {
    const { search, location, bedrooms, bathrooms, size, price } = q;
    const [minSize, maxSize] = size;
    const [minPrice, maxPrice] = price;
    const query = {
      // $text: { $search: search },
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
      bedrooms: { $lte: bedrooms },
      bathrooms: { $lte: bathrooms },
      size: { $gte: minSize, $lte: maxSize },
      price: { $gte: minPrice, $lte: maxPrice },
    };
    results = await Project.find(
      query

      // { score: { $meta: 'textScore' } }
    )
      .skip((page - 1) * perPage)
      .limit(perPage);
    // .sort({ score: { $meta: 'textScore' } })

    count = await Project.find(query).count();
    isNextable = (page - 1) * perPage + results.length < count;
  }
  console.log(results, isNextable);
  return { message: 'Success', data: { results, isNextable } };
};

const getAllProjectsService = async (page?: any, perPage?: any) => {
  const p = page || 1;
  const perP = perPage || 10;

  const products = await Project.find()
    .skip((p - 1) * perP)
    .limit(perP);

  return products;
};

export { searchProjectService, getAllProjectsService };
