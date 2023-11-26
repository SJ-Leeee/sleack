import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Get(':id')
  getSpecificChannel() {}

  @Post()
  createChannel() {}

  @Get(':id/chats')
  getChatsInChannels() {}
}
