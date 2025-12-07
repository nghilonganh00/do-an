export type Province = {
  ProvinceID: number;
  ProvinceName: string;
};

export type District = {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
};

export type Ward = {
  WardCode: number;
  ProvinceID: number;
  DistrictID: number;
  WardName: string;
};
