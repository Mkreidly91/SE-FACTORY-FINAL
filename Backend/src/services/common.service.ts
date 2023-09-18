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
      $text: { $search: search },
      bedrooms,
      bathrooms,
      size: { $gt: minSize, $lt: maxSize },
      price: { $gt: minPrice, $lt: maxPrice },
    },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .exec();
  return { message: 'Success', data: results };
};

export { searchProjectService };
