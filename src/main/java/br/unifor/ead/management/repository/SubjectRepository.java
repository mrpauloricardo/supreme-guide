package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByCreator(User creator);
}
