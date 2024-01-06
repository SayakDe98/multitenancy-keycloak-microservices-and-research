import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Req() req: Request): Promise<Cat[]> {
    console.log(req['tenantId']);
    
    return this.catsService.findAll();
  }
}
