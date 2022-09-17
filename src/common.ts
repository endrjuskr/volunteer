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
    Explore: undefined;
    Home: {sorted: boolean};
    Details: { item: Item };
    Submission: undefined;
  };
  