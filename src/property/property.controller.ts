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
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property-dto';
import { ParseIdPipe } from './pipes/parse-id-pipe';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/create-property-zod-dto';

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
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() createPropertyDto: CreatePropertyZodDto) {
    return createPropertyDto;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() updatePropertyDto: CreatePropertyDto,
  ) {
    return updatePropertyDto;
  }
}
