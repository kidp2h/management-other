'use server';
import provinces from '@/config/provinces.json';

export const getProvinces = async () => {
  return Promise.resolve(provinces);
};
