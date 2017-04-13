package pl.confitura.jelatyna.infrastructure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
//@Profile(DEV)
public class CorsConfiguration {
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//
//                registry.addMapping("/**");
//            }
//        };
//    }

    @Bean
    public RepositoryRestConfigurerAdapter repositoryRestConfigurerAdapter() {
        return new RepositoryRestConfigurerAdapter() {
            @Override
            public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
                config
                        .getCorsRegistry()
                        .addMapping("/**");
            }
        };
    }

}
