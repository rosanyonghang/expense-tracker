import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbconfig from './config/database';
import { CoreModule } from './core/core.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { CategoryModule } from './category/category.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotificationModule } from './notification/notification.module';
import { TransactionModule } from './transaction/transaction.module';
import { RecurringTransactionModule } from './recurring-transaction/recurring-transaction.module';
import { AccountModule } from './account/account.module';
import { InvestmentModule } from './investment/investment.module';
import { ImageModule } from './image/image.module';
import { DefaultSettingsModule } from './default-settings/default-settings.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [
    HealthModule,
    CoreModule,
    TypeOrmModule.forRoot(dbconfig),
    MulterModule.register({
      dest: './files',
    }),
    AuthenticationModule,
    UserModule,
    UserDetailModule,
    CategoryModule,
    NotificationModule,
    RecurringTransactionModule,
    AccountModule,
    TransactionModule,
    InvestmentModule,
    ImageModule,
    DefaultSettingsModule,
    TestimonialModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
