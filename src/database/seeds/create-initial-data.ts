import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const workspacesRepo = dataSource.getRepository(Workspaces);
    await workspacesRepo.insert([{ id: 1, name: 'Sleack', url: 'sleack' }]);

    const channelRepo = dataSource.getRepository(Channels);
    await channelRepo.insert([
      {
        id: 1,
        name: '일반',
        WorkspaceId: 1,
        private: false,
      },
    ]);
  }
}
