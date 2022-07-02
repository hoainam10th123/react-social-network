﻿using Microsoft.EntityFrameworkCore;
using ReactMXHApi6.Core.Interfaces;
using ReactMXHApi6.Helper;
using ReactMXHApi6.Infrastructure.Data;
using ReactMXHApi6.Infrastructure.Services;
using ReactMXHApi6.SignalR;

namespace ReactMXHApi6.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<PresenceTracker>();
            services.AddSingleton<GroupCallOneOneTracker>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
