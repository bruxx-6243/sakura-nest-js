import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property-dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'All properties';
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe, new DefaultValuePipe(1)) id: number,
    @Query('sort', ParseBoolPipe, new DefaultValuePipe(false)) sort: boolean,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) limit: number = 10,
  ) {
    console.log(sort, limit, id);

    return `Property ${id} ${sort} ${limit}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, groups: ['create'] }))
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return createPropertyDto;
  }
}
