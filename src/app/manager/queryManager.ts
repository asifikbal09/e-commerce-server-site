import { Query } from 'mongoose';
import AppError from '../errors/appError';

class QueryManager<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  pagination() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  sortBy() {
    const sort = this?.query?.sortBy || 'createdAt';
    const sortInOrder = this.query.sortOrder || 'asc';

    const sortByFields = [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
      'createdAt',
    ];

    if (!sortByFields.includes(sort as string)) {
      throw new AppError(500, 'Please put a valid string.');
    }

    if (sortInOrder === 'asc') {
      this.modelQuery = this?.modelQuery?.sort(sort as string);
    }

    if (sortInOrder === 'desc') {
      this.modelQuery = this?.modelQuery?.sort(('-' + sort) as string);
    }

    return this;
  }
  filterByPrice() {
    const minPrice = Number(this.query.minPrice) || 0;
    const maxPrice = Number(this.query.maxPrice) || 1000;

    this.modelQuery = this.modelQuery.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    return this;
  }
  
}

export default QueryManager;
