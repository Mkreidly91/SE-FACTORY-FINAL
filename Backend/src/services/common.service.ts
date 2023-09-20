import { text } from 'body-parser';
import { Project } from '../models/project';
import { ProjectSearchSchema } from '../validation/common.validation';
const searchProjectService = async ({
  search,
  location,
  bedrooms,
  bathrooms,
  size,
  price,
}: ProjectSearchSchema) => {
  const [minSize, maxSize] = size;
  const [minPrice, maxPrice] = price;
  const results = await Project.find(
    {
      // $text: { $search: new RegExp(search, 'i').source },
      // $text: { $search: { index: 'text', regex: search } },
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
      bedrooms: { $lte: bedrooms },
      bathrooms: { $lte: bathrooms },
      size: { $gte: minSize, $lte: maxSize },
      price: { $gte: minPrice, $lte: maxPrice },
    }
    // { score: { $meta: 'textScore' } }
  )
    // .sort({ score: { $meta: 'textScore' } })
    .exec();

  console.log(results);

  return { message: 'Success', data: results };
};

export { searchProjectService };
