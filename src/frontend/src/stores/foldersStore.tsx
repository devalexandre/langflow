import { create } from "zustand";
import { getFolderById, getFolders } from "../pages/MainPage/services";
import { FoldersStoreType } from "../types/zustand/folders";
import useFlowsManagerStore from "./flowsManagerStore";

export const useFolderStore = create<FoldersStoreType>((set, get) => ({
  folders: [],
  getFoldersApi: (refetch = false) => {
    if (get()?.folders.length === 0 || refetch === true) {
      get().setLoading(true);
      getFolders().then(
        (res) => {
          set({ folders: res });
          get().getMyCollectionFolder();
          get().setMyCollectionId();
          get().setLoading(false);
        },
        () => {
          set({ folders: [] });
          get().setLoading(false);
        }
      );
    }
  },
  setFolders: (folders) => set(() => ({ folders: folders })),
  loading: false,
  setLoading: (loading) => set(() => ({ loading: loading })),
  getFolderById: (id) => {
    get().setLoadingById(true);
    if (id) {
      getFolderById(id).then(
        (res) => {
          const setAllFlows = useFlowsManagerStore.getState().setAllFlows;
          setAllFlows(res.flows);
          set({ selectedFolder: res });
          get().setLoadingById(false);
        },
        () => {
          get().setLoadingById(false);
        }
      );
    }
  },
  selectedFolder: null,
  loadingById: false,
  setLoadingById: (loading) => set(() => ({ loadingById: loading })),
  getMyCollectionFolder: () => {
    const folders = get().folders;
    const myCollectionId = folders?.find((f) => f.name === "My Collection")?.id;
    if (myCollectionId) {
      getFolderById(myCollectionId).then((res) => {
        set({ myCollectionFlows: res });
      });
    }
  },
  setMyCollectionFlow: (folder) => set(() => ({ myCollectionFlows: folder })),
  myCollectionFlows: null,
  setMyCollectionId: () => {
    const folders = get().folders;
    const myCollectionId = folders?.find((f) => f.name === "My Collection")?.id;
    if (myCollectionId) {
      set({ myCollectionId });
    }
  },
  myCollectionId: "",
  folderToEdit: null,
  setFolderToEdit: (folder) => set(() => ({ folderToEdit: folder })),
  folderUrl: "",
  setFolderUrl: (url) => set(() => ({ folderUrl: url })),
}));