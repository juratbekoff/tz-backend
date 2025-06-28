import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, RegisterUserDto } from './dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public RegisterUser(@Body() data: RegisterUserDto) {
    return this.userService.register(data);
  }

  @Post('login')
  public LoginUser(@Body() data: LoginUserDto) {
    return this.userService.login(data);
  }
}
