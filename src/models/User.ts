import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';

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
    public id: number;

    @Column({ type: DataType.STRING, allowNull: false  })
    public name: string;
}
