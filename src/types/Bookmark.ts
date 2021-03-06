import bookmark from '@/graphQL/queries/bookmarks';

type Bookmark = {
    id: number;
    name: string;
    url: string;
    favicon: string;
    order: number;
};

export default Bookmark;
