declare var PROD_ENV: boolean;

interface WebpackModule {
    hot: {
        data?: any,
        idle: any,
        accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
        decline(dependencies?: any | string | string[]): void;
        dispose(callback?: (data?: any) => void): void;
        addDisposeHandler(callback?: (data?: any) => void): void;
        removeDisposeHandler(callback?: (data?: any) => void): void;
        check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
        apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
        status(callback?: (status?: string) => void): void | string;
        removeStatusHandler(callback?: (status?: string) => void): void;
    };
}

interface NodeModule extends WebpackModule {}
