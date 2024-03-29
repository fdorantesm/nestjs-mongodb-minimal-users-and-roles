import { SlugService } from '@/modules/shared/infrastructure/vendors/slugify';
import { FileService } from '@/modules/shared/utils/file';
import { FileSystemService } from '@/modules/shared/utils/file-system';
import { PathService } from '@/modules/shared/utils/path';
import { UrlService } from '@/modules/shared/utils/url';
import { Module } from '@nestjs/common';

@Module({
  providers: [FileService, UrlService, FileSystemService, PathService, SlugService],
  exports: [FileService, UrlService, FileSystemService, PathService, SlugService],
})
export class SharedModule {}
