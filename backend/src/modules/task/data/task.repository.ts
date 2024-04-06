import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseRepository } from '@task-manager/core/base'
import { PaginationHelper } from '@task-manager/core/pagination'

import { Task } from './task.schema'

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
	constructor(
		@InjectModel(Task.name) private taskRepo: Model<Task>,
		pageHelper: PaginationHelper<Task>
	) {
		super(taskRepo, pageHelper)
	}
}
