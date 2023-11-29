import { Controller, Delete, Get, Post } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacsService: WorkspacesService) {}
  @Get()
  getMyWorkspaces(@User() user) {
    this.workspacsService.getMyWorkspaces(user.id);
  }

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
