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

    const sortByFields = [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
      'createdAt',
    ];

    sortByFields.forEach(field =>{
        console.log(sort);
        if (sort !== field) {
            throw new AppError(500,"Please put a valid string.")
          }
    })

    this.modelQuery = this?.modelQuery?.sort(sort as string);

    return this;
  }
}

export default QueryManager;
