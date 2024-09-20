package br.unifor.ead.management.controller;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.User;
import br.unifor.ead.management.repository.SubjectRepository;
import br.unifor.ead.management.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Subject> getSubjectsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        return subjectRepository.findByCreator(user);
    }

    @PostMapping
    public ResponseEntity<?> createSubject(@Valid @RequestBody Subject subject) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        subject.setCreator(user);
        Subject savedSubject = subjectRepository.save(subject);
        return ResponseEntity.ok(savedSubject);
    }
}