package com.config;

import com.model.Status;
import com.model.TypeAccount;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .maxAge(3600L)
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
    }

    @Bean
    public Status sttDelete() {
        return new Status(-1L);
    }

    @Bean
    public Status sttPending() {
        return new Status(0L);
    }

    @Bean
    public Status sttPublished() {
        return new Status(1L);
    }

    @Bean
    public TypeAccount typeNomal() {
        return new TypeAccount(1L);
    }

    @Bean
    public TypeAccount typeGoogle() {
        return new TypeAccount(2L);
    }

    @Bean
    public TypeAccount typeFacebook() {
        return new TypeAccount(3L);
    }

    @Bean
    public TypeAccount typeGithub() {
        return new TypeAccount(4L);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}