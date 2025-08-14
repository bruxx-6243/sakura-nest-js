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
  Req,
} from '@nestjs/common';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
  updatePropertySchema,
} from './dto/create-property-zod-dto';
import z from 'zod';
import { idParamSchema } from './dto/id-param-dto';
import { Request } from 'express';

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
    @Param('id', new ZodValidationPipe(idParamSchema))
    id: z.infer<typeof idParamSchema>,
    @Body(new ZodValidationPipe(updatePropertySchema))
    updatePropertyDto: z.infer<typeof updatePropertySchema>,
    @Req() req: Request,
  ) {
    // Get the user ip-address
    const ip = req.ip;
    console.log('ip', ip); // 127.0.0.1

    // Get the user user-agent
    const userAgent = req.headers['user-agent'];
    console.log('userAgent', userAgent); // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36

    return updatePropertyDto;
  }
}
