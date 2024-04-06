import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { BaseSchema } from '@task-manager/core/base'

import { ITask, ITaskStatus } from '@task-manager/interfaces/task.types'
import { TaskStatus, TaskStatusSchema } from '@task-manager/modules/task/data'

@Schema({ timestamps: true })
export class Task extends BaseSchema implements ITask {
	@Prop({ type: String })
	name: string

	@Prop({ type: String, required: false })
	description?: string

	@Prop({ type: Date })
	dueDate: Date

	@Prop({ type: () => TaskStatusSchema, default: () => new TaskStatus() })
	status: ITaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task).index({ name: 'text' })
