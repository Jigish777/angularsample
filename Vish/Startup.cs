using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Vish.Startup), "Configuration")]

namespace Vish
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}