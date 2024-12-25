import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type MyBookmark = {
  userId: string | null | undefined;
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  dairyFree: boolean;
  glutenFree: boolean;
  ketogenic: boolean;
  vegan: boolean;
  vegetarian: boolean;
  extendedIngredients: {
    original: string;
    id: string;
  }[];
  steps: {
    number: number;
    step: string;
  }[];
};

type MyBookmarkContextType = {
  bookmarks: MyBookmark[];
  toggleBookmark: (bookmark: MyBookmark) => void;
  deleteBookmark: (bookmarkId: string) => void;
  isBookmarked: boolean;
};

export const MyBookmarksContext = createContext<MyBookmarkContextType | null>(
  null
);

type MyBookmarksProviderProps = {
  children: ReactNode;
};

export const MyBookmarksProvider = ({ children }: MyBookmarksProviderProps) => {
  const [bookmarks, setBookmarks] = useState<MyBookmark[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Toggle Bookmark
  const toggleBookmark = (bookmark: MyBookmark) => {
    const bookmarkIndex = bookmarks.findIndex((b) => b.id === bookmark.id);

    if (bookmarkIndex !== -1) {
      // Bookmark already exists, remove it
      setBookmarks([
        ...bookmarks.slice(0, bookmarkIndex),
        ...bookmarks.slice(bookmarkIndex + 1),
      ]);
      setIsBookmarked(false);
    } else {
      // Bookmark doesn't exist, add it
      setBookmarks([...bookmarks, bookmark]);
      setIsBookmarked(true);
    }
  };

  // Delete Bookmark
  const deleteBookmark = () => {
    console.log("delete bookmark");
  };

  return (
    <MyBookmarksContext.Provider
      value={{ bookmarks, toggleBookmark, deleteBookmark, isBookmarked }}
    >
      {children}
    </MyBookmarksContext.Provider>
  );
};

export const useMyBookmarkContext = () => {
  const context = useContext(MyBookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider"
    );
  }
  return context;
};
