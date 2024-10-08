import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'school', name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  pass: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;
}
