import bookmark from '@/graphQL/queries/bookmarks';

type Bookmark = {
    id: number;
    name: string;
    url: string;
    order: number;
};

export default Bookmark;
