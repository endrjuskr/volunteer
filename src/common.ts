export interface Item {
    id: number;
    username: string;
    description: string;
    tags: string;
    logo: string;
    reviews: string[];
    uri: string;
}

export type RootStackParamList = {
    Home: undefined;
    Details: { item: Item };
    Submission: undefined;
  };
  