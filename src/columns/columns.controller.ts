import { Controller } from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Controller()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}
}
