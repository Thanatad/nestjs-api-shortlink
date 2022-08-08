import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync, IsString } from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment

    @IsString()
    DB_HOST: string

    @IsString()
    API_CURRENT_VERSION: string
    
    @IsString()
    BASE_URL: string

    @IsNumber()
    SERVER_PORT: number

    @IsString()
    DB_NAME: string

    @IsString()
    DB_USERNAME: string
    
    @IsString()
    DB_PASSWORD: string
}

export const validate = (config: Record<string, unknown>) => {
    const validateConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true }
    )

    const errors = validateSync(validateConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validateConfig
}