export interface IModalsState {
  renameListModal: {
    isShow: boolean;
    id: string;
  };

  deleteListModal: {
    isShow: boolean;
    id: string;
  };

  loaderModal: {
    isShow: boolean;
  };
}

export interface IChangeModal {
  isShow: boolean;
}

export interface IChangeModalId extends IChangeModal {
  id: string;
}
