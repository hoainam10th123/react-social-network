using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactMXHApi6.Core.Entities;

namespace ReactMXHApi6.Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            if (await userManager.Users.AnyAsync()) return;           

            var users = new List<AppUser> {
                new AppUser { UserName = "hoainam10th", DisplayName = "Nguyễn Hoài Nam" },
                new AppUser{ UserName="ubuntu", DisplayName = "Ubuntu Nguyễn"},
                new AppUser{UserName="lisa", DisplayName = "Lisa" },
                new AppUser{UserName="phathuong", DisplayName = "Phat Huong" },
                new AppUser{UserName="dat", DisplayName = "Nguyen Dat" },
                new AppUser{UserName="datnguyen", DisplayName = "Nguyen Dat Phat" },
                new AppUser{UserName="datnguyen05", DisplayName = "Nguyen Thi Phat" },
                new AppUser{UserName="tananlx", DisplayName = "Nguyen Tan An" },
                new AppUser{UserName="datnguyen01", DisplayName = "Nguyen Dat Phat" },
                new AppUser{UserName="hoaray", DisplayName = "Nguyen Thi Hoa Ray" },
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }   
        }
    }
}
