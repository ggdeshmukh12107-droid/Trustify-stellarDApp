export interface IndexQuery {
  field: string;
  operator: '==' | '>=' | '<=';
  value: any;
}

/**
 * A simulated data indexer to fulfill the level 6 indexing requirement.
 * In a real-world scenario on Stellar, this would map to a remote indexing service like a Subgraph or an Indexer node.
 */
export class DataIndexer {
  private memoryIndex: Map<string, any[]> = new Map();

  constructor(collectionName: string) {
    this.memoryIndex.set(collectionName, []);
  }

  indexData(collectionName: string, data: any[]) {
    this.memoryIndex.set(collectionName, data);
  }

  query(collectionName: string, queryFilters: IndexQuery[]): any[] {
    const data = this.memoryIndex.get(collectionName) || [];
    return data.filter(item => {
      return queryFilters.every(q => {
        if (q.operator === '==') return item[q.field] === q.value;
        if (q.operator === '>=') return item[q.field] >= q.value;
        if (q.operator === '<=') return item[q.field] <= q.value;
        return false;
      });
    });
  }
}

export const globalIndexer = new DataIndexer('tasks');
