
const MONGODB_API_BASE = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-service/endpoint/data/v1';
const DATABASE_NAME = 'ai_tutor';

interface MongoDocument {
  _id?: string;
  [key: string]: any;
}

export class MongoService {
  private apiKey: string;
  private dataSource: string;

  constructor() {
    // In a real app, this would be set via environment variables
    this.apiKey = 'your-mongodb-data-api-key'; // This needs to be configured
    this.dataSource = 'Cluster0';
  }

  private async makeRequest(action: string, collection: string, data: any) {
    const response = await fetch(`${MONGODB_API_BASE}/action/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({
        dataSource: this.dataSource,
        database: DATABASE_NAME,
        collection: collection,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`MongoDB API error: ${response.statusText}`);
    }

    return response.json();
  }

  async saveCourse(course: any, userId: string) {
    return this.makeRequest('insertOne', 'courses', {
      document: {
        ...course,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async getCourses(userId: string) {
    return this.makeRequest('find', 'courses', {
      filter: { userId },
      sort: { createdAt: -1 },
    });
  }

  async saveChat(chatData: any, userId: string) {
    return this.makeRequest('insertOne', 'chats', {
      document: {
        ...chatData,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async getChats(userId: string, subject?: string) {
    const filter: any = { userId };
    if (subject) {
      filter.subject = subject;
    }

    return this.makeRequest('find', 'chats', {
      filter,
      sort: { createdAt: -1 },
    });
  }

  async updateChat(chatId: string, messages: any[]) {
    return this.makeRequest('updateOne', 'chats', {
      filter: { _id: { $oid: chatId } },
      update: {
        $set: {
          messages,
          updatedAt: new Date(),
        },
      },
    });
  }
}

export default MongoService;
