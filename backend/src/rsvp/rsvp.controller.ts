import { Body, Controller, Get, Post } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvp: RsvpService) {}

  @Get()
  findAll() {
    return this.rsvp.findAll();
  }

  @Post()
  create(@Body() dto: CreateRsvpDto) {
    return this.rsvp.create(dto);
  }
}
