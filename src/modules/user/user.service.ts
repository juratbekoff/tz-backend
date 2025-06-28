import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: RegisterUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { phone: data.phone },
      });

      if (user) {
        throw new BadRequestException('User already exists!');
      }

      const registeredUser = await this.prismaService.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          password: data.passwrod,
        },
      });

      return {
        message: 'REGISTERED',
        ID: registeredUser.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { phone: data.phone },
      });

      if (!user || user.password !== data.passwrod) {
        throw new BadRequestException('Phone number or password incorrect!');
      }

      delete user.password;
      return {
        message: 'SUCCESS',
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}
