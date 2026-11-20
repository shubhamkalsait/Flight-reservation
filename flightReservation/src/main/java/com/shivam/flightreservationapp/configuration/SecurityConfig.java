package com.shivam.flightreservationapp.configuration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.shivam.flightreservationapp.components.JwtRequestFilter;
import com.shivam.flightreservationapp.services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(org.springframework.security.config.Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/register", "/api/users/login").permitAll()
                .requestMatchers("/api/flights/create", "/api/flights/update/**", "/api/flights/delete/**").hasRole("ADMIN")
                .requestMatchers("/api/flights/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/bookings/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/users/userList", "/api/users/delete/**").hasRole("ADMIN")
                .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userService.findByUsername(username)
            .map(user -> new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), List.of()))
            .orElse(null);
    }

    
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    }
}



