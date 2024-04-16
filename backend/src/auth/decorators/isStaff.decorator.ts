import { SetMetadata } from '@nestjs/common';

export const STAFF_ONLY = 'StaffOnly';
export const StaffOnly = () => SetMetadata(STAFF_ONLY, true);
