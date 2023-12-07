import { Optional } from 'sequelize';
import { AfterUpdate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

interface UserAttributes {
    id: number;
    name: string;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({ timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4 
    })
    public id: string;

    @Column({ type: DataType.STRING, allowNull: false  })
    public name: string;

	@Column({ type: DataType.FLOAT, defaultValue: 10000 })
	public balance: number;

	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	public version: number;

	@AfterUpdate
	public static incrementVersion(instance: User): void { 
		instance.version += 1; 
	}
}
