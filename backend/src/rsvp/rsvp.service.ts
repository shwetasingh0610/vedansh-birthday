import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.rsvp.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateRsvpDto) {
    const message = dto.message?.trim();
    return this.prisma.rsvp.create({
      data: {
        name: dto.name.trim(),
        attending: dto.attending,
        guests: dto.guests ?? 0,
        message: message ? message : null,
      },
    });
  }
}
