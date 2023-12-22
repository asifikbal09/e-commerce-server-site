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
    const sort = this?.query?.sortBy || '-createdAt';
    const sortInOrder = this.query.sortOrder || 'asc';

    const sortByFields = [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
      '-createdAt',
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
  filterByTags() {
    const tagName = this?.query?.tags;

    if (tagName) {
      this.modelQuery = this.modelQuery.find({ 'tags.name': tagName });
    }
    return this;
  }

  filterByDate() {
    const startDate = (this?.query?.startDate as string) || '2000-01-01';
    const endDate = (this?.query?.endDate as string) || '2050-01-01';

    if (startDate > endDate) {
      throw new AppError(
        400,
        'Invalid date range: startDate must be before endDate.',
      );
    }

    this.modelQuery = this.modelQuery.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });

    return this;
  }

  filterByLanguage() {
    const language = this.query.language;

    if (language) {
      this.modelQuery = this.modelQuery.find({ language: language });
    }
    return this;
  }

  filterByProvider() {
    const provider = this.query.provider;

    if (provider) {
      this.modelQuery = this.modelQuery.find({ provider: provider });
    }
    return this;
  }
  filterByWeeks() {
    const weeks = Number(this?.query?.durationInWeeks);

    if (weeks) {
      this.modelQuery = this.modelQuery.find({ durationInWeeks: weeks });
    }
    return this;
  }
  filterByLevel() {
    const level = this?.query?.level;

    if (level) {
      this.modelQuery = this.modelQuery.find({ 'details.level': level });
    }
    return this;
  }
}

export default QueryManager;
