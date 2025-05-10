package github.sagubr;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.servers.Server;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@OpenAPIDefinition(
        info = @Info(
                title = "key-keeper",
                version = "0.0"
        ),
        servers = @Server(
                url = "http://10.92.21.172:8080/"
        ),
        security = @SecurityRequirement(name = "Authorization")
)
@SecuritySchemes({
        @SecurityScheme(
                name = "Authorization",
                type = SecuritySchemeType.HTTP,
                scheme = "bearer",
                bearerFormat = "JWT"
        )
})
public class Application {

    public static void main(String[] args) {
        Micronaut.run(Application.class, args);
    }
}