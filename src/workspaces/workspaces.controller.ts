import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':workspace/members')
  getAllMembersFromWorkspace() {}

  @Post(':workspaced/members')
  inviteMembersToWorkspace() {}

  @Delete(':workspace/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':workspace/users/:id')
  getMemberInfoInWorkspace() {}
}
