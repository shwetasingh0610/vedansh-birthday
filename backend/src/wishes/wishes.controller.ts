import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishes: WishesService) {}

  @Get()
  findAll() {
    return this.wishes.findAll();
  }

  @Post()
  create(@Body() dto: CreateWishDto) {
    return this.wishes.create(dto);
  }
}
