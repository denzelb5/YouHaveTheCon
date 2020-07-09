using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.DataAccess
{
    public class UserRepository
    {
        string ConnectionString;
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }
    }
}
