import { Controller } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('/schools')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

}
